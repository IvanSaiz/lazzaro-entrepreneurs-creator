export default {
  read: {
    title: "Calendar · Events and training",
    subtitle:
      "Create events or courses in the calendar or trainings without expiration date",
    createNewBtn: "New item"
  },
  create: {
    title: "New event or training",
    subtitle:
      "Configure your project here. If you have any questions or doubts, please contact your advisor.",
    generalForm: {
      title: "General",
      mainImg: "Primary image",
      images: {
        label: "Images",
        add: "Add images"
      },
      name: "Name",
      description: "Description",
      type: "Type",
      typeOptions: {
        event: "Event",
        training: "Training"
      },
      mode: "Mode",
      modeOptions: {
        onsite: "On site",
        online: "Online"
      },
      status: "Status",
      statusOptions: {
        draft: "Draft",
        active: "Active"
      }
    },
    dateForm: {
      title: "Dates",
      startInscription: "Start of registration",
      endInscription: "End of registration",
      startEvent: "Start of event",
      endEvent: "End del event",
      recurrent: {
        label: "Is it recurrent?",
        under: "Recurrent event"
      },
      frequency: {
        label: "What is the frequency?",
        options: {
          weekly: "Weekly",
          monthly: "Monthly",
          annual: "Yearly"
        }
      }
    },
    locationForm: {
      title: "Access / Location",
      link: "Access link",
      location: "Location"
    },
    ratesForm: {
      title: "Rates",
      amount: "Amount",
      cost: "Price",
      name: "Name",
      rateTable: "Rates table",
      delete: ""
    },
    notifications: {
      createdEvent: "Event successfully created",
      editedEvent: "Event successfully updated",
      removedEvent: "Event successfully removed"
    },
    highlight: {
      label: "Highlight Event",
      under: "Highlighted Event"
    }
  }
};
