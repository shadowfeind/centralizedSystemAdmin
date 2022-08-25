const fileValidation = (event, setImage, setImgSrc) => {
  let validExt = ["jpeg", "jpg", "gif", "png", "pdf"];
  let image = event.target.files[0];
  const imageExt = image.name.substring(image.name.lastIndexOf(".") + 1);

  const result = validExt.includes(imageExt);

  if (!result) {
    alert("Invalid file format. Must be jpeg, jpg, gif, png or pdf");
    return false;
  }
  if (parseFloat(image.size / (1024 * 1024)) > 5) {
    alert(
      `File size must be less than or equal to 5 mb, current size${parseFloat(
        image.files[0].size / (1024 * 1024)
      )} mb`
    );
    return false;
  }
  const reader = new FileReader();
  reader.onload = (x) => {
    setImgSrc(x.target.result);
  };
  reader.readAsDataURL(image);
  setImage(image);
  return true;
};

export default fileValidation;
