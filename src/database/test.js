const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {

    // Inserir dados
    proffyValue = {
        name: "Alex de Araujo",
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQG5io4P9yqsCw/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=nNkNmwdgUpDcwxNWqWnj2Y1kk_3M8g5yzfA--ylNr8Q",
        whatsapp: "63 98484245",
        bio: "Entusiasta de TI e louco por desafios em busca de crescimento no ambito Dev !"
    }

    classValue = {
        subject: 1,
        cost: "20",
        // o proffy_id vira pelo BD
    }

    classScheduleValues = [
        // o class_id vira pelo BD, apos cadastrar a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos so proffys
    const selectedProffys =  await db.all("SELECT * FROM proffys")
   // console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do Professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectedClassesAndProffys)

    // o horario que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_to > "520"
    `)

  //  console.log(selectClassesSchedules)


})