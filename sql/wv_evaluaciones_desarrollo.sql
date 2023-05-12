select top 100 * 
from vw_evaluaciones_desarrollo 
WHERE usuario = 'EZEQUIEL'
order by fecha_trabajo_h desc;



-- select  usuario ,  
-- 	numero_tarea ,
-- 	left((select trabajos_proyectos.asunto from  
-- 				 trabajos_proyectos  
-- 				where trabajos_proyectos.numero_tarea = tareas_diarias.numero_tarea ) , 70) as asunto , 
-- 	convert(datetime,min( fecha)) as fecha_trabajo_d, 
-- 	convert(datetime,max( fecha)) as fecha_trabajo_h, 
-- 	convert(datetime,(  select Max(                trabajos_proyectos_usuarios.entrega_usuario)   
-- 		from  trabajos_proyectos_usuarios     
-- 		where trabajos_proyectos_usuarios.numero_tarea = tareas_diarias.numero_tarea AND           
-- 		trabajos_proyectos_usuarios.usuario = tareas_diarias.usuario  ))  as fecha_vto_usuario , 
-- 	sum( minutos) as tiempo_usado,
-- 	(  select Sum( trabajos_proyectos_usuarios.tiempo_estimado )  
-- 		from  trabajos_proyectos_usuarios    
-- 		where  trabajos_proyectos_usuarios.numero_tarea = tareas_diarias.numero_tarea AND  
-- 		trabajos_proyectos_usuarios.usuario = tareas_diarias.usuario )  as tiempo_presupuestado,
-- 	(DATEDIFF	( DAY, max( fecha) , (  select Max(                trabajos_proyectos_usuarios.entrega_usuario)   
-- 		from  trabajos_proyectos_usuarios     
-- 		where trabajos_proyectos_usuarios.numero_tarea = tareas_diarias.numero_tarea AND           
-- 		trabajos_proyectos_usuarios.usuario = tareas_diarias.usuario  ))  ) as diferencia_dias,
-- 	(sum( minutos) * 100 /   (  select Sum( trabajos_proyectos_usuarios.tiempo_estimado )  
-- 		from  trabajos_proyectos_usuarios    
-- 		where  trabajos_proyectos_usuarios.numero_tarea = tareas_diarias.numero_tarea AND  
-- 		trabajos_proyectos_usuarios.usuario = tareas_diarias.usuario ) ) - 100 as porcentaje_dif_minutos,    
--     month(min( fecha)) as mes,
--     year(min( fecha)) as anio		
-- 	from tareas_diarias 
-- 	where tareas_diarias.fecha >  '2021-05-01' 
-- 	--and  tareas_diarias.usuario IN ( 'PABLO','FEDERICO','ANICOLAS', 'GUILLERMO', 'EMILIO', 'MAURICIO','RAUL','DIEGO', 'EZEQUIEL')
-- 	group by usuario ,
-- 	numero_tarea 
--     having 	(  select Sum( trabajos_proyectos_usuarios.tiempo_estimado )  
-- 		from  trabajos_proyectos_usuarios    
-- 		where  trabajos_proyectos_usuarios.numero_tarea = tareas_diarias.numero_tarea AND  
-- 		trabajos_proyectos_usuarios.usuario = tareas_diarias.usuario )  > 0 ;
