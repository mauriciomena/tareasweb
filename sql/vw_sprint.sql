ALTER VIEW vw_sprint
as
select sprint as id,
         (CASE WHEN dificultad = '3'THEN 'ALTA'
              WHEN dificultad = '2'THEN 'MEDIA'
              ELSE
              'BAJA'
              END) AS DIFICULTAD,
       trabajos_proyectos.estado_tarea,
       trabajos_proyectos.numero_tarea,
       trabajos_proyectos.asunto,
       trabajos_proyectos.tiempo_presupuestado,
       dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) as tarea_en_proceso,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('P','N') AND dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) = 0  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS BACKLOG,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('P') AND dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) > 0  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS EN_PROCESO,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('T')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS EN_TESTING,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('X')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS TESTING_OK,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('A','D','E')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS HECHO,

        ( select count(trabajos_proyectos_usuarios.usuario)
            from trabajos_proyectos_usuarios, usuarios
            where trabajos_proyectos_usuarios.numero_tarea = trabajos_proyectos.numero_tarea and
            trabajos_proyectos_usuarios.estado_tarea in ('P','E') and
            trabajos_proyectos_usuarios.usuario = usuarios.usuario and
            usuarios.mercadotecnia = 1 ) as tot_usuarios_pendientes
from trabajos_proyectos , tipo_estados_tareas
where trabajos_proyectos.numero_tarea > 70000 AND
      tipo_estados_tareas.codigo = trabajos_proyectos.estado_tarea and
      trabajos_proyectos.estado_tarea in ('P','N','T','X','A','E','D','C','S')  ;

--select * from vw_sprint ;