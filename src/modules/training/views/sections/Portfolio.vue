<template>
  <section class="training">
    <header>
      <h1>
        {{ $t("training.home.cards.Portfolio.title") }}
      </h1>
      <p>
        {{ $t("training.Portfolio.subtitle") }}
      </p>
    </header>
    <section>
      <p>
        {{ $t("training.home.cards.Portfolio.subtitle") }}
      </p>
      <div>
        <h2>
          {{ $t("training.Portfolio.create.title") }}
        </h2>
        <p>
          {{ $t("training.Portfolio.create.subtitle") }}
        </p>
      </div>
      <img src="../../assets/images/portfolio/create.png" alt="Create blog" />
      <div>
        <h2>
          {{ $t("training.Portfolio.images.title") }}
        </h2>
        <p>
          {{ $t("training.Portfolio.images.subtitle") }}
        </p>
      </div>
      <img src="../../assets/images/portfolio/images.png" alt="Images" />
      <div>
        <h2>
          {{ $t("training.Portfolio.featured.title") }}
        </h2>
        <p>
          {{ $t("training.Portfolio.featured.subtitle") }}
        </p>
      </div>
      <div>
        <h2>
          {{ $t("training.Portfolio.clients.title") }}
        </h2>
        <p>
          {{ $t("training.Portfolio.clients.subtitle") }}
        </p>
      </div>
      <img src="../../assets/images/portfolio/clients.png" alt="Clients" />
    </section>
  </section>
</template>
