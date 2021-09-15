const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

const ROOT_NOTION_API = 'https://api.notion.com/v1';

const getDatabaseData = async () => {
    const dataBaseQueryUrl = `${ROOT_NOTION_API}/databases/${process.env.DATABASE_ID}/query`;

    const filter = {
        
        "sorts": [
            {
                "property": "Published",
                "direction": "ascending"
            }
        ]
    };

    // TODO: FIX cache to 1 d
    const dataBaseData = await Cache(dataBaseQueryUrl, {
        duration: "1d",
        type: "json",
        dryRun: true,
        fetchOptions: {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
                "Notion-Version": "2021-08-16",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filter)
        }
    });

    return dataBaseData.results;
}

const getPageBlockChildrenData = async (blockId) => {
    const blockChildrenQueryUrl = `${ROOT_NOTION_API}/blocks/${blockId}/children`;
    // TODO: FIX cache to 1 d
    const pageData = await Cache(blockChildrenQueryUrl, {
        duration: "1d",
        type: "json",
        fetchOptions: {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
                "Notion-Version": "2021-08-16",
                "Content-Type": "application/json"
            }
        }
    });
    return pageData;
}

function slugify(text) {
    return text ? text.toString().toLowerCase().trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/--+/g, '-')  : '';
}

const mapNotionResponseToTextContent = ([key, property]) => {
    switch (property.type) {
        case "rich_text":
        case "text":
      case "title":
          return {
            [`${key}`]: property[property.type][0].text.content
          };
        case "files":
          return {
            [`${key}`]: property[property.type][0].file.url
          };
        case "select":
          return {
            [`${key}`]: property[property.type].name
          };
        default:
          break;
      };
};

module.exports = async function () {
    const databaseData = await getDatabaseData();

    // parse the notion response down to something more reasonable
    const results = databaseData.map((post, index) => {
        const flattenedProperties = Object.entries(post.properties)
        .filter(
            ([key, property]) =>
            property.select || (property[property.type] && property[property.type].length)
        )
        .map(mapNotionResponseToTextContent)
        .reduce((previousValue, currentValue, currentIndex, array) => {
          return {
            ...previousValue,
            ...currentValue
          }
        }, {});

        return {
            id: post.id,
            created: post.created_time,
            url: post.url,
            slug: slugify(flattenedProperties.Title),
            ...flattenedProperties,
        };
    });

    const finalResult = await Promise.all(results.map(async (result) => {
        const blockData = await getPageBlockChildrenData(result.id);

        const mappedBlockData = blockData.results
        .map(block => {
            let mdConvert;
            let mdText;

            switch(block.type) {
                case 'heading_1':
                    mdConvert = '#';
                    mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
                case 'heading_2':
                    mdConvert = '##';
                    mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
                case 'heading_3':
                    mdConvert = '###';
                    mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
                case 'bulleted_list_item':
                    mdConvert = '- ';
                    mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
                case 'paragraph':
                    mdConvert = '';
                    mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
                case 'image':
                    mdConvert = '';
                    mdText = `![post block related](${block[block.type].file.url})`;
                    break;
                default:
                    mdConvert = '';
                    // mdText = block[block.type].text.length ? block[block.type].text[0].text.content : '';
                    break;
            }

            return `${mdConvert} ${mdText}`;
        }).join('\n');

        return {
            ...result,
            block: mappedBlockData
        };
    }));



    return await {
        posts: await finalResult
    };
};