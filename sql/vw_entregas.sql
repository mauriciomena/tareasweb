ALTER VIEW vw_entregas
as
select  trabajos_proyectos.numero_tarea as id,
       trabajos_proyectos.asunto,
       trabajos_proyectos.tarea,
       trabajos_proyectos.tipo_incidente,
       trabajos_proyectos.estado_tarea,
       trabajos_proyectos.sistema,
       ms_sistema.descripcion  as deno_sistema,
       trabajos_proyectos.version,
       tipo_estados_tareas.denominacion,
       ( select trabajos_proyectos_tipo_incidente.descripcion
           from trabajos_proyectos_tipo_incidente
          where trabajos_proyectos_tipo_incidente.codigo = trabajos_proyectos.tipo_incidente) as deno_tipo_incidente,
             ( SELECT top 1 recibido
          FROM mensajes
          WHERE mensajes.destacado = 'E' AND
          mensajes.numero_tarea = trabajos_proyectos.numero_tarea   
          order by recibido desc ) as fecha
          
from trabajos_proyectos, 
      tipo_estados_tareas,
      ms_sistema
where  trabajos_proyectos.sistema = ms_sistema.ms_sistema and
      trabajos_proyectos.numero_tarea > 70000 AND
      tipo_estados_tareas.codigo = trabajos_proyectos.estado_tarea AND 
      trabajos_proyectos.version > 0 and 
      ( SELECT top 1 id_email
          FROM mensajes
          WHERE mensajes.destacado = 'E' AND
          mensajes.numero_tarea = trabajos_proyectos.numero_tarea   )  > 0  ;
