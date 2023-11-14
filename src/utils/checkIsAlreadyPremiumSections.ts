import { apiEvents } from "@/modules/calendar/api";
import { apiProjects } from "@/modules/projects/api";

type TCache = {
  [key: string]: {
    isAlreadyPremiumSection: boolean;
    premiumEventId: string | undefined;
    premiumProjectId: string | undefined;
  };
};

type ReturnType = (
  ongId: string
) => Promise<TCache[0] & { inValidateCache: () => void }>;

let inValidateCache: () => void;

const checkIsAlreadyPremiumSections = ((): ReturnType => {
  const cache: TCache = JSON.parse(
    localStorage.getItem("premiumSections") || "{}"
  );
  let isValidCache = true;

  //? don't forget to invalid cache when mutating the project/events table
  inValidateCache = (): void => {
    isValidCache = false;
  };

  return async (ongId: string) => {
    if (cache[ongId] && isValidCache) {
      return { ...cache[ongId], inValidateCache };
    }

    const [{ data: events }, { data: projects }] = await Promise.all([
      apiEvents.getEvents(ongId),
      apiProjects.getProjects(ongId)
    ]);

    const premiumEvent = events.find(event => event.isPremium);
    const premiumProject = projects.find(project => project.isPremium);

    const isAlreadyPremiumSection = !!premiumEvent || !!premiumProject;

    cache[ongId] = {
      isAlreadyPremiumSection,
      premiumEventId: premiumEvent?.id,
      premiumProjectId: premiumProject?.id
    };

    localStorage.setItem("premiumSections", JSON.stringify(cache));

    isValidCache = true;

    return {
      isAlreadyPremiumSection,
      premiumEventId: premiumEvent?.id,
      premiumProjectId: premiumProject?.id,
      inValidateCache
    };
  };
})();

export default checkIsAlreadyPremiumSections;
export { inValidateCache };
