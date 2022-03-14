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
    err.cf_password = 'Konfirmasi password tidak sama dengan password anda.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export const valid2 = ({
  namaLengkap,
  noKTP,
  jenisKelamin,
  alamatLengkap,
  tanggalLahir,
  noHandphone,
  kelurahan,
}) => {
  const err = {};

  if (!namaLengkap) {
    err.namaLengkap = 'Mohon isi nama lengkap anda.';
  }

  if (!noKTP) {
    err.noKTP = 'Please add your No KTP .';
  } else if (noKTP.replace(/ /g, '').length < 15) {
    err.noKTP = 'No KTP kurang dari 16.';
  }

  if (!jenisKelamin) {
    err.jenisKelamin = 'Mohon isi jenis kelamin anda.';
  }

  if (tanggalLahir === new Date()) {
    err.tanggalLahir = 'Mohon isi tanggal lahir anda.';
  }

  if (!alamatLengkap) {
    err.alamatLengkap = 'Mohon isi alamat lengkap anda.';
  }

  if (!noHandphone) {
    err.noHandphone = 'Mohon isi nomor handphone anda.';
  } else if (noHandphone.replace(/ /g, '').length > 13) {
    err.noHandphone = 'No handphone tidak boleh lebih dari 13.';
  } else if (noHandphone.replace(/ /g, '').length <= 11) {
    err.noHandphone = 'No Handphone kurang dari 11.';
  }

  if (!kelurahan) {
    err.kelurahan = 'Mohon isi kelurahan anda.';
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
