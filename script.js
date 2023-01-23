let req = new XMLHttpRequest();
req.open('GET', './json/image_list.json');
req.onreadystatechange = function () {
  if (this.readyState == 4) {
    let data = JSON.parse(this.response);
    for (var i = 0; i < data.length; i++) {
      let div = document.createElement('div');
      div.setAttribute('class', 'image');
      div.onclick = function () {
        this.classList.toggle('image-selected');
      };
      div.onmouseover = function () {
        let element = this;
        this.timerId = setTimeout(function () {
          element.classList.add('image-magnified');
        }, 1000);
        div.onmouseout = function () {
          clearTimeout(this.timerId);
          this.classList.remove('image-magnified');
        };
      };
      let img = document.createElement('img');
      img.src = data[i];
      div.appendChild(img);
      document.body.appendChild(div);
    }
  }
};

req.send();

function selectAll(btn) {
  let images = document.getElementsByClassName('image');
  for (var i = 0; i < images.length; i++) {
    if (btn.value == 'Unselect All') {
      images[i].classList.remove('image-selected');
    } else {
      images[i].classList.add('image-selected');
    }
  }
  btn.value=='Unselect All' ? 'Select All' : 'Unselect All'
}

function slideshow(btn) {
  let images = document.getElementsByClassName('image');
  let index = 0;
  images[index].classList.add('image-magnified');

  let intervalId = setInterval(function () {
    images[index].classList.remove('image-magnified');
    index++;
    if (index < images.length) {
      images[index].classList.add('image-magnified');
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
