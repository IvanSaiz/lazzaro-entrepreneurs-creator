<template>
  <section class="training support">
    <header>
      <h1>
        {{ $t("training.home.cards.Support.title") }}
      </h1>
      <p>
        {{ $t("training.Support.subtitle") }}
      </p>
    </header>
    <section>
      <p>
        {{ $t("training.home.cards.Support.subtitle") }}
      </p>
      <div>
        <h2>
          {{ $t("training.Support.button.title") }}
        </h2>
        <p>
          {{ $t("training.Support.button.subtitle") }}
        </p>
      </div>
      <div id="zoho-button">
        <img src="../../assets/images/support/zoho.png" alt="button-img" />
        <span id="marker" />
      </div>
      <div>
        <h2>
          {{ $t("training.Support.contact.title") }}
        </h2>
        <p>
          {{ $t("training.Support.contact.subtitle") }}
        </p>
      </div>
      <div>
        <h2>
          {{ $t("training.Support.describe.title") }}
        </h2>
        <p>
          {{ $t("training.Support.describe.subtitle") }}
        </p>
      </div>
      <img src="../../assets/images/support/ticket.png" alt="describe-img" />
      <div>
        <h2>
          {{ $t("training.Support.personalized.title") }}
        </h2>
        <p>
          {{ $t("training.Support.personalized.subtitle") }}
        </p>
      </div>
    </section>
  </section>
</template>

<style lang="scss">
  .training.support {
    #zoho-button {
      position: relative;

      #marker {
        position: absolute;
        bottom: 5px;
        right: 282px;
        width: 50px;
        aspect-ratio: 1/1;
        border: 4px solid #ff7456;
        background: rgba(255, 116, 86, 0.3);
        border-radius: 10px;
      }
    }
  }
</style>
