export default {
  read: {
    title: "Members and Donations",
    subtitle:
      "List of the organisation's members and the configuration of donations",
    steps: {
      partners: "Members",
      types: "Types of donations"
    },
    partnersFields: {
      form: {
        name: "Name",
        email: "Email address",
        amount: "Amount",
        status: "Status",
        date: "Date",
        actions: ""
      }
    },
    form: {
      category: "Category name",
      partnerType: {
        label: "Billing period",
        options: {
          partner: "Member"
        },
        annualAmount: "Amount",

        period: {
          oneMonth: "Monthly",
          oneYear: "Annual"
        }
      }
    },
    donations: {
      title: "Types of membership donations",
      form: {
        name: "Name",
        price: "Donation amount",
        period: "Billing period",
        actions: ""
      },

      status: "On"
    },
    other: {
      label: "Let the donar decide the amount",
      under: "All the quantities to choose from are fixed"
    },
    notifications: {
      deleteDonation: "Donation successfully removed",
      createDonation: "Donation successfully created"
    }
  },
  detail: {
    title: "Member profile",
    subtitle: "Here you have all the contact details of the member",
    form: {
      image: "Profile picture",
      name: "Name",
      birthDay: "Birthday",
      surname: "Surname",
      email: "Email address",
      phone: {
        label: "Phone no.",
        message: "Invalid phone format"
      },
      address: "Address",
      dni: "ID card",
      date: "Date of accession",
      status: {
        label: "Status",
        options: {
          active: "On",
          inactive: "Off"
        }
      },
      amount: "Amount",
      comunications: "Comunications"
    },
    yes: "Yes",
    no: "No",
    deletePartner: "Delete member",
    notifications: {
      projectRemoved: "Proyecto eliminado con éxito"
    }
  }
};
