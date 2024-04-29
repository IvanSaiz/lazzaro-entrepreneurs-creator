export default {
  read: {
    title: "Portfolio",
    subtitle: "All your projects to show them to your potential clients.",
    see: "See portfolio",
    design: "Design",
    table: {
      title: "Projects",
      time: {
        label: "Remaining time",
        options: {
          days: "Days",
          today: "Today",
          expired: "Expired",
          noLimit: "No limit"
        }
      },
      percent: "% achieved",
      skills: "Skills",
      total: "Total",
      status: {
        label: "Status",
        options: {
          enabled: "Enabled",
          disabled: "Disabled"
        }
      },
      actions: "Actions",
      deleteModal: {
        title: "Delete Project",
        subtitle:
          "Are you sure you want to delete this project? This action cannot be undone."
      }
    },
    newProject: "New project"
  },
  create: {
    title: "New fundraising project",
    subtitle:
      "Configure your project here. If you have any doubts or queries, please contact your advisor.",
    highlight: {
      label: "Highlight project",
      under: "Highlighted product"
    },
    mainImg: "Primary image",
    images: {
      label: "Images",
      add: "Add image"
    },
    form: {
      name: "Project name",
      description: "Description",
      category: {
        label: "Category",
        options: {
          children: "Children",
          education: "Education",
          health: "Health",
          animals: "Animals",
          environment: "Environment",
          naturalDisaster: "Natural disaster",
          economicDev: "Economic development",
          other: "Other"
        }
      },
      status: {
        label: "Status",
        options: {
          enabled: "Enabled",
          disabled: "Disabled"
        }
      },
      startDate: "Start date",
      limitDate: {
        label: "Final date",
        help: "You can leave it without an end date"
      },
      amount: "Target amount"
    },
    notifications: {
      projectCreated: "Project successfully created",
      projectEdited: "Changes successfully saved",
      projectRemoved: "Project successfully removed",
      alreadyPremium: "You already have a highlighted section",
      projectHasDonations:
        "You cannot delete this project because it has received donations"
    }
  }
};
