export default {
  read: {
    title: "Accounts",
    subtitle: "Follow up your portal's trends and actions here",
    steps: {
      all: "All",
      projects: "Projects",
      events: "Events",
      courses: "Training",
      single: "Donations",
      donations: "Donations",
      products: "Products",
      subscriptions: "Subscriptions",
      columns: {
        name: "Name",
        email: "Email address",
        amount: "Amount",
        state: "Status",
        certificate: "Certificate",
        date: "Date",
        event: "Event",
        course: "Course",
        project: "Project",
        item: "Product"
      }
    },
    modal: {
      title: "How much money do you want to withdraw?",
      subtitle: `The money collected in your Innovaslab portal will go to the account configured in the profile of your
          <br> organization. The 3,1% of the same will be discounted.`,
      available: "available",
      collected: "€ collected - 3,1% of Innovaslab",
      warn:
        "To make the withdrawal of funds, it must be done from your associated Paypal account. Please click withdraw to gain access."
    },
    notifications: {
      withdrawSuccess: "Money successfully withdrawn"
    }
  }
};
