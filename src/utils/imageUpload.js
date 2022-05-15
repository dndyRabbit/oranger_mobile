import {
  REACT_NATIVE_CLOUD_UPDATE_PRESET_1,
  REACT_NATIVE_CLOUD_NAME,
  REACT_NATIVE_CLOUD_API,
  REACT_NATIVE_CLOUD_UPDATE_PRESET_2,
} from './url';

export const checkImage = image => {
  let err = '';
  console.log(image.mime);
  if (!image) return (err = 'File does not exist.');

  if (image.size > 1024 * 1024 * 5)
    return (err = 'The largest image size is 5mb.');

  if (image.mime === 'image/jpeg' || image.mime === 'image/png') {
    return (err = '');
  } else {
    return (err = 'Image format is incorrect.');
  }
};

export const imageUpload = async images => {
  let imgArr = [];

  const formData = new FormData();
  formData.append('file', images);

  formData.append('upload_preset', REACT_NATIVE_CLOUD_UPDATE_PRESET_1);
  formData.append('cloud_name', REACT_NATIVE_CLOUD_NAME);

  const res = await fetch(REACT_NATIVE_CLOUD_API, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  const data = await res.json();

  imgArr.push({public_id: data.public_id, url: data.secure_url});

  return imgArr;
};

export const imageUploadReport = async images => {
  let imgArr = [];

  const formData = new FormData();
  formData.append('file', images);

  formData.append('upload_preset', REACT_NATIVE_CLOUD_UPDATE_PRESET_2);
  formData.append('cloud_name', REACT_NATIVE_CLOUD_NAME);

  const res = await fetch(REACT_NATIVE_CLOUD_API, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  const data = await res.json();

  imgArr.push({public_id: data.public_id, url: data.secure_url});

  return imgArr;
};
