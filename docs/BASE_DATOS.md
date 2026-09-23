# SportHub — Diseño de base de datos

## Descripción

SportHub es una plataforma web para la gestión y reserva de instalaciones deportivas.

La aplicación tendrá dos tipos principales de usuarios:

* Usuario: puede consultar instalaciones y realizar reservas.
* Administrador: puede gestionar usuarios, instalaciones y reservas.

## Entidades principales

### Usuario

Representa a una persona registrada en la plataforma.

Atributos:

* `id`
* `nombre`
* `apellidos`
* `email`
* `password`
* `rol`
* `fecha_registro`

### Instalación

Representa una instalación deportiva que puede ser reservada.

Atributos:

* `id`
* `nombre`
* `descripcion`
* `tipo`
* `ubicacion`
* `precio_hora`
* `activa`

### Reserva

Representa la reserva de una instalación por parte de un usuario.

Atributos:

* `id`
* `usuario_id`
* `instalacion_id`
* `fecha`
* `hora_inicio`
* `hora_fin`
* `estado`
* `fecha_creacion`

## Relaciones

Un usuario puede realizar muchas reservas.

Una reserva pertenece a un único usuario.

Una instalación puede tener muchas reservas.

Una reserva pertenece a una única instalación.

Relaciones:

`USUARIO 1:N RESERVA`

`INSTALACION 1:N RESERVA`

## Reglas de negocio iniciales

1. Un usuario debe estar registrado para realizar una reserva.
2. Un usuario no puede reservar una instalación si existe otra reserva para la misma instalación en el mismo intervalo de tiempo.
3. Una reserva debe tener una fecha y una hora de inicio y finalización válidas.
4. Una instalación inactiva no puede recibir nuevas reservas.
5. Un usuario puede cancelar sus propias reservas.
6. Un administrador puede gestionar las instalaciones y consultar todas las reservas.
7. El email de cada usuario debe ser único.
8. Una reserva tendrá un estado que permita distinguir, como mínimo, entre activa y cancelada.