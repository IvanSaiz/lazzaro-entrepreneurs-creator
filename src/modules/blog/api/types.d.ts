declare interface Article {
  id: string;
  member_id: string;
  title: string;
  description: string;
  status: "enabled" | "disabled";
  date: string;
  icon: string;
}

declare interface ArticlePostDTO {
  member_id: string;
  title: string;
  description: string;
  status: "enabled" | "disabled";
  date?: string;
  icon: string;
}

declare interface ArticleSubmit {
  title: string;
  icon: [{ url: string; name: string }];
}
