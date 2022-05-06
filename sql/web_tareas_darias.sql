CREATE VIEW web_tareas_diarias
as
SELECT (numero_id + sucursal_id + numero_cliente ) as id,
		usuario,
		sucursal_id,
		numero_id,
		fecha,
		numero_cliente,
		descripcion_cliente,
		contacto,
		detalle,
		tipo_tarea,
		minutos,
		numero_tarea,
		horas
from tareas_diarias 
where tareas_diarias.fecha  > '2020-01-01';