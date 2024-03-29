ALTER VIEW vw_sprint
as
select trabajos_proyectos.sprint as id,
        trabajos_proyectos_sprint.detalle,
        trabajos_proyectos_sprint.objetivo,
        trabajos_proyectos_sprint.fecha_inicio,
        trabajos_proyectos_sprint.fecha_final,
         isnull(convert(numeric(3,0),trabajos_proyectos.dificultad),0) as puntos_dificultad,
         trabajos_proyectos.dificultad AS deno_dificultad,
       trabajos_proyectos.estado_tarea,
       trabajos_proyectos.numero_tarea,
       trabajos_proyectos.asunto,
       trabajos_proyectos.tiempo_presupuestado,
       dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) as tarea_en_proceso,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('N') THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS BACKLOG,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('L') AND dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) = 0  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS HACER,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('L') AND dbo.f_sql_tareas_en_proceso(trabajos_proyectos.numero_tarea) > 0  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS EN_PROCESO,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('T')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS EN_TESTING,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('X')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS TESTING_OK,
        (CASE WHEN trabajos_proyectos.estado_tarea in ('A','D','E')  THEN STR(trabajos_proyectos.numero_tarea)+'-'+trabajos_proyectos.asunto ELSE '' END) AS HECHO,

        ( select count(trabajos_proyectos_usuarios.usuario)
            from trabajos_proyectos_usuarios, usuarios
            where trabajos_proyectos_usuarios.numero_tarea = trabajos_proyectos.numero_tarea and
            trabajos_proyectos_usuarios.estado_tarea in ('P','E') and
            trabajos_proyectos_usuarios.usuario = usuarios.usuario and
            usuarios.mercadotecnia = 1 ) as tot_usuarios_pendientes,
            isnull((select Sum(tareas_diarias.minutos)  
             from tareas_diarias  , usuarios
            where  tareas_diarias.numero_tarea = trabajos_proyectos.numero_tarea  and
                   tareas_diarias.usuario = usuarios.usuario and
                   usuarios.mercadotecnia = 1 ),0)  as total_consumido,
        ( select top 1 trabajos_proyectos_usuarios.usuario
            from trabajos_proyectos_usuarios, usuarios
            where trabajos_proyectos_usuarios.numero_tarea = trabajos_proyectos.numero_tarea and
            trabajos_proyectos_usuarios.estado_tarea = 'E' and
            trabajos_proyectos_usuarios.usuario = usuarios.usuario and
            usuarios.mercadotecnia = 1 ) as en_proceso_por,
            trabajos_proyectos.prioridad
from trabajos_proyectos , tipo_estados_tareas, trabajos_proyectos_sprint
where trabajos_proyectos.numero_tarea > 70000 AND
      tipo_estados_tareas.codigo = trabajos_proyectos.estado_tarea and
      trabajos_proyectos_sprint.sprint = trabajos_proyectos.sprint and
      trabajos_proyectos.estado_tarea in ('P','L','N','T','X','A','E','D','C','S')  ;
