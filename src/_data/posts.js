const { default: axios } = require('axios');

module.exports = async () => {
  try {
    const res = await axios.get('https://blooming-oasis-10255.herokuapp.com/posts');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};