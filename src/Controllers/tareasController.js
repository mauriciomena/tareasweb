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
  usuarios: async(req, res) => {

    try {

      const data = await db.vw_trabajos_proyectos_usuarios.findAll({
        where: {        
             id: req.params.id 
        }
      })
      console.log(data);
      res.json({
        meta:{
          status: 200,
          total : data.length,
          url : `http://${req.headers.host}/tareas/usuarios`
        },
        data: data
    })
      
    } catch (error) {


      console.log(error);
      res.json({
        errors: {
          status : 500,
          detail : 'Error interno en la peticion de la información',
          msg: 'Error al grabar en el servidor'
        }
        
      })
      
    }



    // return res.json({
    //   meta:{
    //     status: 200,
    //     total : data.length,
    //     url : `http://${req.headers.host}/tareas/articulos`
    //   })

 
  },
  sprint:  (req, res) =>  {
    
   
    db.vw_sprint.findAll({
          where: {
            [Op.and]: [
              { id: req.params.id}
            ]
          }
        }
     )
      .then((tareas) => {
        console.log(tareas);
        //res.render("products/productList.ejs", { products });
        let inicial = 0 
        let tot_presupuesto =  tareas.reduce((accum,current)=> accum + current.tiempo_presupuestado, inicial)
        
        inicial = 0
        let tot_consumido =  tareas.reduce((accum,current)=> accum + current.total_consumido, inicial)

        inicial = 0
        let total_puntos =  tareas.reduce((accum,current)=> accum + current.puntos_dificultad, inicial)
        let backlog  = tareas.filter(tarea=> ( tarea.estado_tarea === 'N' && tarea.tot_usuarios_pendientes > 0) )
        inicial = 0
        let puntos_backlog =  tareas.reduce((accum,current)=>  accum + (current.estado_tarea === 'N' && current.tot_usuarios_pendientes > 0 ? current.puntos_dificultad: 0), inicial)
        
        let hacer  = tareas.filter(tarea=> (tarea.estado_tarea === 'L' && tarea.tarea_en_proceso === 0 && tarea.tot_usuarios_pendientes > 0) )
        inicial = 0
        let puntos_hacer =  tareas.reduce((accum,current)=>  accum + ( current.estado_tarea === 'L' && current.tarea_en_proceso === 0 && current.tot_usuarios_pendientes > 0 ? current.puntos_dificultad: 0), inicial)
        
        let proceso  = tareas.filter(tarea=> tarea.estado_tarea === 'L' && tarea.tarea_en_proceso > 0 )

        inicial = 0
        let puntos_proceso =  tareas.reduce((accum,current)=>  accum + ( current.estado_tarea === 'L' && current.tarea_en_proceso > 0 ? current.puntos_dificultad: 0), inicial)
        
        let testing  = tareas.filter(tarea=> tarea.estado_tarea === 'T')

        inicial = 0
        let puntos_testing =  tareas.reduce((accum,current)=>  accum +  ( current.estado_tarea === 'T' ? current.puntos_dificultad: 0), inicial)

        let testingOk  = tareas.filter(tarea=> tarea.estado_tarea === 'X')

        inicial = 0
        let puntos_testingOk =  tareas.reduce((accum,current)=>  accum +  (current.estado_tarea === 'X' ? current.puntos_dificultad: 0), inicial)

        let hecho  = tareas.filter(tarea=> tarea.estado_tarea === 'A' || tarea.estado_tarea === 'D' || tarea.estado_tarea === 'E' || tarea.estado_tarea === 'S' || ( tarea.estado_tarea === 'P' && tarea.tot_usuarios_pendientes === 0) )

        inicial = 0
        let puntos_hecho=  tareas.reduce((accum,current)=>  accum +  ( current.estado_tarea === 'A' || current.estado_tarea === 'D' || current.estado_tarea === 'E' || current.estado_tarea === 'S' || ( current.estado_tarea === 'P' && current.tot_usuarios_pendientes === 0)? current.puntos_dificultad: 0), inicial)
        
        let totalBacklog  = backlog.length
        let totalhacer  = hacer.length
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
            detalle: tareas[0].detalle,
            objetivo: tareas[0].objetivo,
            fecha_inicio: tareas[0].fecha_inicio,
            fecha_final: tareas[0].fecha_final,
            enBacklog:totalBacklog ,            
            puntosBacklog:puntos_backlog,
            enHacer:totalhacer,
            puntosEnHacer:puntos_hacer,
            enProceso:totalProceso,
            puntosEnProceso:puntos_proceso,
            enTesting:totalTesting,
            punstoEnTesting:puntos_testing,
            enTestingOk:totalTestingOk,
            puntosEnTestingOk:puntos_testingOk,
            hecho:totalHecho,
            puntosHecho: puntos_hecho,
            url : `http://${req.headers.host}/tareas/sprint/${req.params.id}`,
            presupuesto: tot_presupuesto,
            consumido: tot_consumido,
            total_puntos: total_puntos
          },
          data: {
              hacer,
             backlog,
             proceso,
             testing,
             testingOk,
             hecho
          }
      })          
    }).catch((error) => res.json(error));
  } ,
  entregas: (req, res) => {

    db.vw_entregas.findAll( { 
      order: [
        ['id', 'DESC']
      ] })
      .then((entregas) => {
        //res.render("products/productList.ejs", { products });
        //res.json(tareas)
        res.json({
          meta:{
            status: 200,
            total : entregas.length,
            url : `http://${req.headers.host}/tareas/entregas`
          },
          data: entregas
      })          
    }).catch((error) => res.send(error));
  },
};