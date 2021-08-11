module.exports = {
  setAttributes: (el, options) => {
    Object.keys(options).forEach((attr) => {
      el.setAttribute(attr, options[attr]);
    });
  },
};

/* 
  how to use it:
  ex: setAttributes(input, {"class": "my-class", "type": "checkbox", "checked": "checked"});
  */
