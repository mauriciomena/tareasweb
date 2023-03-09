ALTER VIEW vw_trabajos_proyectos_usuarios
as
SELECT  trabajos_proyectos_usuarios.numero_tarea as id,
        trabajos_proyectos_usuarios.usuario,
        trabajos_proyectos_usuarios.estado_tarea,
        trabajos_proyectos_usuarios.numero_tarea
FROM         trabajos_proyectos_usuarios
where      
        trabajos_proyectos_usuarios.estado_tarea = 'E';