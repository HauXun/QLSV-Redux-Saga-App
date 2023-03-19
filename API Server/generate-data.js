const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.locale = "vi";

function removeAccents(str) {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

const randomCitiesList = (n) => {
  if (n <= 0) return [];

  const citiesList = [];

  Array.from(new Array(n)).forEach(() => {
    if (citiesList.length >= 62)
      return;
    let cityName = faker.address.cityName();

    let cityMap = cityName.split(' ');
    let cityMapLength = cityMap.length;
    let cityCode = cityMap.map((s, i) => {
      if (s === "TP.")
        return;

      let result;

      if (i + 1 === cityMapLength) {
        if (s.includes("-"))
        {
          result = s.split('-').map(s2 => s2.trim().substring(0)).join('').toLowerCase();

          return removeAccents(result);
        }
        
        result = s.trim().substring(0);
        return removeAccents(result);
      } else {
        if (s.includes("-"))
        {
          result = s.split('-').map(s2 => s2.trim().substring(0, 1)).join('').toLowerCase();

          return removeAccents(result);
        }
        
        result = s.trim().substring(0, 1);
        return removeAccents(result);
      }
    }).join('').toLowerCase();

    if (citiesList.some(c => c.code === cityCode))
      return;

    const city = {
      code: cityCode,
      name: cityName
    };

    citiesList.push(city);
  });

  return citiesList;
}

const randomStudentsList = (cities, n) => {
  if (n <= 0) return [];

  const studentsList = [];

  for (const city of cities) {
    Array.from(new Array(n)).forEach(() => {
      const student = {
        id: faker.datatype.uuid,
        name: faker.name.fullName(),
        age: faker.datatype.number({ min: 18, max: 25}),
        mark: faker.datatype.number({ min: 0, max: 10}),
        gender: faker.name.sex() === "male" ? "Nữ" : "Nam",
        city: city["code"],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      studentsList.push(student);
    });
  }

  return studentsList;
}

(() => {
  const citiesList = randomCitiesList(250);
  const studentsList = randomStudentsList(citiesList, 5);

  const db = {
    cities: citiesList,
    students: studentsList
  }

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Successfully written');
  });
})();