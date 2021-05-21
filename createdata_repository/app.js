"use strict";

const axios = require('axios');
const faker = require('faker');
const moment = require('moment');

const taux_de_nicotine = [2, 4, 8, 11, 18]

const tama_nickname = ['pika', 'bulbi', 'cara']

const axios_instance = axios.create({
    baseURL: 'http://localhost:1337',
    timeout: 1000
});


const random_int_from_interval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const get_fake_people = (a, b, c, d) => {

    const gender = random_int_from_interval(0, 1);

    const someone = {
        pseudo: faker.name.firstName(gender),
        objvap: random_int_from_interval(a, b),
        objnic: taux_de_nicotine[c],
        qtnic: taux_de_nicotine[d]
    };

    return someone;
}

const get_fake_vap = (hour, people, a, b) => {

    return {
        time: moment().add(hour,'hours').format("hh:mm:ss"),//format for sqlite
        total: random_int_from_interval(a, b),
        pseudo: people.pseudo,
        person: people.id
    };
}

const get_fake_tama = (nickname, people, a, b) => {

    return {
        name : nickname,
        energy: random_int_from_interval(0, 100),
        hunger: random_int_from_interval(0, 100),
        joy: random_int_from_interval(0, 100),
        smoke: random_int_from_interval(a, b),
        pseudo: people.pseudo,
        person: people.id
    };
}


(async () => {

    

    try {
        try {
            await axios_instance.post('/people', get_fake_people(50,100,0,1));
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }

    try {
        try {
            await axios_instance.post('/people', get_fake_people(250,300,2,1));
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
    
    try {
        try {
            await axios_instance.post('/people', get_fake_people(300,350,1,4));
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("insertion of 3 fake people");

    let people;

    //Get People
    try {
        const result = await axios_instance.get('/people');
        people = result.data;
    } catch (error) {
        console.error(error);
    }


    if(people.length>0){
        //Create 24 vap stats for each people
        let x = 120;
        for (const a_people of people) {
    
            let n = 0;
            while (n < 24) {
    
                try {
                    await axios_instance.post('/vaps', get_fake_vap(n, a_people,x,x+50));
                } catch (error) {
                    console.error(error);
                }
    
                n++;
            }
            x += 50;
        }
    
        console.log("insertion of vap stats over the past 24 hours for each people");
    }else{
        console.error('no people in database');
    }

    if(people.length>0){
        //Create 10 steps stats for each people
        let n = 0;
        for (const a_people of people) {
    
            if (a_people.objnic == taux_de_nicotine[0]){
                try {
                    await axios_instance.post('/tamagotchis', get_fake_tama(tama_nickname[n], a_people,90,100));
                } catch (error) {
                console.error(error);
                }
                n++;
            }
            else if (a_people.objnic == taux_de_nicotine[2]){
                try {
                    await axios_instance.post('/tamagotchis', get_fake_tama(tama_nickname[n], a_people,10,30));
                } catch (error) {
                console.error(error);
                }
                n++;
            }
            else if (a_people.objnic == taux_de_nicotine[1]){
                try {
                    await axios_instance.post('/tamagotchis', get_fake_tama(tama_nickname[n], a_people,48,51));
                } catch (error) {
                console.error(error);
                }
                n++;
            }
        }
    
        console.log("insertion of fake tama stats for each people");
    }else{
        console.error('no people in database');
    }

})();
