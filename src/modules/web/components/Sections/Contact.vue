<template lang="pug">
section.public-contact
  .public-contact__header
    h2.h2--dash {{ $t('web.public.contactForm.title') }}
    h4 {{ $t('web.public.contactForm.subtitle') }}
    .public-contact__content
      formulate-input(
        type="text"
        name="contactTitle"
        :label="$t('web.public.contactForm.form.title')"
      )
      formulate-input(
        type="text"
        name="contactSubTitle"
        :label="$t('web.public.contactForm.form.subtitle')"
      )
</template>
