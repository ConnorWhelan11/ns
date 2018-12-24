/* This is an example of what the data looks like once its is processed
organization: {
  name: 'Southern New Hampshire Services',
  phone: '603-516-8160',
  website: 'http://www.senhs.org',
  facilities: [
    {
      id: 'SNHS',
      name: 'Dover Clinic',
      coordinate: {
        latitude: 43.2188066,
        longitude: -70.9358951
      },
      address: '272 County Farm Road, Dover, NH 03820',
      image: '...base64_string...' 
      programs: [
        {
          desc: 'For Women Intensive Outpatient Program',
          phone: '603-516-8160',
          type: 'SA',
          type_desc: 'Substance Use Disorder',
        },
        {
          desc: 'Turning Point',
          phone: '603-516-8160',
          type: 'SA',
          type_desc: 'Substance Use Disorder',
        },
        {
          desc: 'Addiction Recovery Center',
          phone: '603-516-8160',
          type: 'SA',
          type_desc: 'Substance Use Disorder',
        },
        {
          desc: 'Outpatient Services',
          phone: '603-516-8160',
          type: 'SA',
          type_desc: 'Substance Use Disorder',
        }
      ]
    }
  ]
}
*/

const DoverFacilities = {
  rows: [
    {
      name: 'Southern New Hampshire Services',
      name2: 'Other description',
      phone: '603-516-8160',
      website: 'http://www.senhs.org',
      latitude: 43.2188066,
      longitude: -70.9358951,
      street: '272 County Farm Road',
      unit: 'Unit # 312',
      city: 'Dover',
      state: 'NH',
      zip: '03820',
      zip4: '1234',
      type: 'MH',
      codes:
        '101000100000000111101111111000100011101111100111100110000011010001010011101001000111100111110011111000'
    }
  ]
}

const ManchesterFacilities = {
  rows: [
    {
      name: 'Groups Recover Together',
      phone: '800-683-8313',
      website: 'http://www.joingroups.com',
      name2: 'Groups Manchester',
      latitude: 42.9951385,
      longitude: -71.4614769,
      street: '50 Bridge Street Suite 101',
      unit: 'Unit # 312',
      city: 'Manchester',
      state: 'NH',
      zip: '03101',
      zip4: '1234',
      type: 'MH',
      codes:
        '101000100000000111101111111000100011101111100111100110000011010001010011101001000111100111110011111000'
    }
  ]
}

class Api {
  // unused for now.
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json'
    }
  }

  static get(latitude, longitude, distance) {
    return fetch(
      `https://tx77pqz0x4.execute-api.us-east-2.amazonaws.com/prototype/GetFacilities?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
    )
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => {
        console.error(error)
      })
  }

  static getPhysicians(latitude, longitude, distance) {
    return fetch(
      `https://tx77pqz0x4.execute-api.us-east-2.amazonaws.com/prototype/GetPhysicians?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
    )
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => {
        console.error(error)
      })
  }

  static getTestData(latitude, longitude, distance) {
    var switchStr = latitude + ' ' + longitude
    var data = ''

    switch (switchStr) {
      case '42.9956397 -71.4547891':
        data = ManchesterFacilities
        break
      case '43.2188066 -70.9358951':
        data = DoverFacilities
        break
      default:
        data = DoverFacilities
    }

    return Promise.resolve(data)
  }
}

export default Api
