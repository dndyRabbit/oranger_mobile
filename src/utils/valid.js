export const valid = ({email, password, password_confirmation}) => {
  const err = {};

  if (!email) {
    err.email = 'Mohon isi email anda.';
  } else if (!validateEmail(email)) {
    err.email = 'Format email tidak benar.';
  }

  if (!password) {
    err.password = 'Please add your password.';
  } else if (password.length < 6) {
    err.password = 'Password minimal 6 digit.';
  }

  if (password !== password_confirmation) {
    err.cf_password = 'Konfirmasi password tidak sama.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export const valid2 = ({
  fullName,
  ktp,
  gender,
  address,
  birthday,
  handphone,
}) => {
  const err = {};

  if (!fullName) {
    err.fullName = 'Mohon isi nama lengkap anda.';
  }

  if (!ktp) {
    err.ktp = 'Please add your No KTP .';
  } else if (ktp.replace(/ /g, '').length < 15) {
    err.ktp = 'No KTP kurang dari 16.';
  }

  if (!gender) {
    err.gender = 'Mohon isi jenis kelamin anda.';
  }

  if (birthday === new Date()) {
    err.birthday = 'Mohon isi tanggal lahir anda.';
  }

  if (!address) {
    err.address = 'Mohon isi alamat lengkap anda.';
  }

  if (!handphone) {
    err.handphone = 'Mohon isi nomor handphone anda.';
  } else if (handphone.replace(/ /g, '').length > 13) {
    err.handphone = 'No handphone tidak boleh lebih dari 13.';
  } else if (handphone.replace(/ /g, '').length <= 11) {
    err.handphone = 'No Handphone kurang dari 11.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
