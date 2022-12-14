let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        console.log('list');
        db.TareasDiarias.findAll( { offset: 15, limit: 15 })
          .then((tareas) => {
            //res.render("products/productList.ejs", { products });
            //res.json(tareas)
            res.json({
              meta:{
                status: 200,
                total : tareas.length,
                url : `http://${req.headers.host}/tareas`
              },
              data: tareas
          })          
        }).catch((error) => res.send(error));
    },
    art: (req, res) => {
      console.log('articulos');
      db.Articulo.findAll( )
        .then((tareas) => {
          //res.render("products/productList.ejs", { products });
          //res.json(tareas)
          res.json({
            meta:{
              status: 200,
              total : tareas.length,
              url : `http://${req.headers.host}/tareas/articulos`
            },
            data: tareas
        })          
      }).catch((error) => res.send(error));
  },
  sprint: (req, res) => {
    console.log(req.params.id);

    db.vw_sprint.findAll({
          where: {
            [Op.and]: [
              { id: req.params.id}
            ]
          }
        }
     )
      .then((tareas) => {
        //res.render("products/productList.ejs", { products });
         
        let backlog  = tareas.filter(tarea=> (( tarea.estado_tarea === 'P' || tarea.estado_tarea === 'N' )&& tarea.tarea_en_proceso === 0 ) )
        //let tiempobacklog = backlog.reduce((acc,tarea)=>{ return acc += tarea.tiempo_presupuestado })
        let proceso  = tareas.filter(tarea=> tarea.estado_tarea === 'P' && tarea.tarea_en_proceso > 0 )
        let testing  = tareas.filter(tarea=> tarea.estado_tarea === 'T')
        let testingOk  = tareas.filter(tarea=> tarea.estado_tarea === 'X')
        let hecho  = tareas.filter(tarea=> tarea.estado_tarea === 'A' || tarea.estado_tarea === 'D' || tarea.estado_tarea === 'E')
        
        let totalBacklog  = backlog.length
        let totalProceso  = proceso.length
        let totalTesting  = testing.length
        let totalTestingOk  = testingOk.length
        let totalHecho  = hecho.length

        // let tiempobacklog  = backlog.reduce((acum,current)=>  acum + current.tiempo_presupuestado)
        // console.log('----------------------------------------tiempobacklog');
        // console.log(acum);
        // console.log('----------------------------------------tiempobacklog');
        


        res.json({
          meta:{
            status: 200,
            total : tareas.length,
            enBacklog:totalBacklog ,
            
            enProceso:totalProceso,
            enTesting:totalTesting,
            enTestingOk:totalTestingOk,
            hecho:totalHecho,
            url : `http://${req.headers.host}/tareas/sprint/${req.params.id}`
          },
          data: {
             backlog,
             proceso,
             testing,
             testingOk,
             hecho
          }
      })          
    }).catch((error) => res.json(error));
}
  };