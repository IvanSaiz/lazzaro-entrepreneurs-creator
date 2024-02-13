export default {
  read: {
    title: "Calendar of events",
    subtitle: "Create events or courses in the calendar or trainings",
    createNewBtn: "New event",
    search: {
      placeholder: "Search event"
    },
    notifications: {
      deleted: "Event successfully deleted"
    },
    design: {
      button: "Design",
      modal: {
        title: "Design",
        section: "Events",
        form: {
          title: "Title",
          labels: {
            title: "Title",
            subtitle: "Subtitle",
            color: "Color"
          },
          save: "Save"
        }
      }
    },
    deleteModal: {
      title: "Delete event",
      subtitle:
        "Are you sure you want to delete this event? This action cannot be undone."
    }
  },
  create: {
    title: "New event or training",
    subtitle:
      "Configure your event or training here. If you have any doubts or queries, please contact your advisor.",
    generalForm: {
      title: "General",
      mainImg: "Main image",
      images: {
        label: "Images",
        add: "Add image"
      },
      name: "Name of the event",
      description: "Description",
      type: "Type",
      typeOptions: {
        event: "Event",
        training: "Training"
      },
      mode: "Way of doing the event",
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
      startEvent: "Start of the event",
      endEvent: "End of the event",
      recurrent: {
        label: "Is it recurrent?",
        under: "Recurrent event"
      }
    },
    locationForm: {
      title: "Online link / Location",
      label: "Add the access URL or location"
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
