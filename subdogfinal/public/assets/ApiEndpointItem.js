const baseUrl = 'http://localhost:5001';

function ApiEndpointItem(type, title, labels, inputs, url, id) {
  this.type = type;
  this.title = title;
  this.labels = labels;
  this.inputs = inputs;
  this.url = url;
  this.id = id;

  return this.init();
}

ApiEndpointItem.prototype.getUrl = function(inputsData) {
  let url = this.url;
  if (inputsData) {
    const possibleInputs = ['animalId', 'userId', 'homeId'];
    possibleInputs.forEach(inputStr => url = url.replace(`:${inputStr}`, inputsData[inputStr]));
  }

  return url;
};

ApiEndpointItem.prototype.getInput = function(input) {
  const inputVal = this.template.find(`#${input}`).val();
  if (!inputVal.length || !inputVal) {
    this.validationError = true;
    return;
  }

  return inputVal;
};

ApiEndpointItem.prototype.apiCall = function () {
  let requestData = {};
  let url = this.url;

  if (this.inputs) {
    this.inputs.forEach(input => requestData[input] = this.getInput(input));
    if (this.validationError) {
      return;
    }

    url = this.getUrl(requestData);
  }

  $.get(`${baseUrl}/${url}`).then((responseData) => {
    const responseContainer = $(`#${this.id}`).find('.responseContainer');
    responseContainer.find('.content').html(JSON.stringify(responseData, null, 4));
    responseContainer.show();

    responseContainer.on('click', '.close', () => responseContainer.hide());
  });
};

ApiEndpointItem.prototype.getTemplate = function () {
  const template = $(`<div id="${this.id}">
        <h2>${this.title}</h2>
        
        <div class="form"></div>
        <button id="submitButton-${this.id}">Send</button>
        
        <pre class="responseContainer">
            <div class="close">Close</div>
            <div class="content"></div>
        </pre>
    </div>`);

  if (this.inputs) {
    this.inputs.forEach((input, index) => {
      template.find('.form').append(`<div class="input-container">
        <label for="${input}">${this.labels[index]}</label>
        <input type="text" name="${input}" id="${input}" placeholder="${input}" />
        </div>`);
    });
  }

  const self = this;
  template.on('click', `#submitButton-${this.id}`, () => {
    self.apiCall();
  });

  this.template = template;
  return template;
};

ApiEndpointItem.prototype.init = function() {
  $(`.${this.type}-routing`).append(this.getTemplate());
};
