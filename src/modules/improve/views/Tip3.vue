<template lang="pug">
  .improve-tip
    header
      h1 Nuevo evento o formación
      p Crear un nuevo evento o planificar una nueva formación

    .improve-tip__body
      p Queremos crear un nuevo evento o planificar una nueva formación. ¿Cómo lo hacemos? Siguiendo paso a paso esta fabulosa guía.
      p Nos encontramos en nuestro panel principal. Podemos llegar por dos vías.
      p Abajo en tus #[strong herramientas],  aparecer #[strong crear nuevo evento] y #[strong crear nueva formación]. Si hoy la intrepidez se adueñó de ti y quieres explorar nuevos caminos, que sepas que puedes llegar también a través del menú lateral, haciendo clic en #[strong Calendario], y abajo a la derecha aparece “Crear Nuevo”.
      p Independientemente de la ruta, llegaremos a esta pantalla, donde se nos solicitan los siguientes datos:

      img(src="./img/C3.png")

      h3 Nombre
      p El nombre que le vamos a poner a nuestro evento o formación.
      p Si es un evento, que quede clara la actividad.
      p Si es formación que el núcleo del contenido de la formación se vea reflejado.
      p Aquí no hace falta extenderse de más, porque el resto de información lo podemos poner en el siguiente  apartado.

      h3 Descripción
      p Aquí convendría poner a quién va dirigido, lo que pretendemos conseguir con el evento o formación. Debemos suplir la necesidad de información del que va a participar aquí. ¿Necesita llevar algo? ¿La formación ofrece algún tipo de acreditación?

      h3 Fechas
      p Aquí dividimos en este apartado dos áreas. Por un lado poner un inicio y un fin de inscripciones y cuando se inicia y se termina el evento.
      p La fecha de inicio y de fin de inscripciones no deben ser mayores que la fecha de inicio del evento o formación. Creemos en la magia, pero estamos en contra de las paradojas espacio-temporales.

      h3 Recurrencia
      p ¿Tengo que hacer un evento cada jueves si realmente va a ser sieeeempre a la misma hora y lugar? La respuesta es no.
      p Para facilitaros las cosas hemos puesto este botón ¿Es recurrente? y a la derecha un interruptor, que si está la bolita negra a la derecha nos indica que está activado, y desactivado si está hacia la izquierda y de color blanco.
      p Luego nos pregunta la frecuencia con que se repite.

      h3 Acceso / ubicación
      p Imagina hacer un evento o formación al que van a acudir muchas personas, pero al lugar equivocado. ¡Sería terrible! Por eso aquí, sólamente escribiendo el comienzo de la dirección en el campo #[strong Ubicación], ya te salen sugerencias de ubicación, puedes copiar y pegar tu dirección en este campo o escribirla. El caso es que desde aquí tienes control a esta funcionalidad tan útil.
      p Si el evento es Online, lo que has de rellenar, es el campo de #[strong Link de acceso].

      h3 Tarifas
      p Aquí podemos dividir las categorías o tipos de entrada a nuestros eventos y formaciones. Por ejemplo, los niños menores de cierta edad o personas mayores de determinada edad tienen una tarifa diferente. O los socios y miembros de su organización tienen un descuento.
      p Todo eso lo podemos configurar aquí.
      p Pondremos el nombre y la cantidad de dinero que queramos recaudar para dicho evento.
      p Finalizamos con el precioso botón de guardar abajo a la derecha y ¡Ya lo tenemos!
      p Si volvemos a pulsar en el calendario, podremos ver nuestro flamante evento o formación en la fecha que hemos configurado.
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip2 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>
