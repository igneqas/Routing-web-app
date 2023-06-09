export const formatRoute = (unformattedRoute: any, name: string) => {
  try {
    return {
      name: name,
      distance: unformattedRoute.features[0].properties.trackLength,
      time: unformattedRoute.features[0].properties.totalTime,
      ascend: unformattedRoute.features[0].properties.filteredAscend,
      type: unformattedRoute.features[0].properties.name,
      coordinates: unformattedRoute.features[0].geometry.coordinates,
    };
  } catch {
    unformattedRoute.name = name;
    return unformattedRoute;
  }
};

export const getRouteType = (name: string) => {
  switch (name) {
    case "vm-forum-liegerad-schnell":
      return RouteNames.Quickest;
    case "safety":
      return RouteNames.Leisure;
    case "shortest":
      return RouteNames.Shortest;
    case "pollution-free":
      return RouteNames.PollutionFree;
    case "hiking-mountain":
      return RouteNames.Mountain;
    default:
      return RouteNames.Quickest;
  }
};

enum RouteNames {
  Quickest = "Quickest",
  Leisure = "Leisure",
  Shortest = "Shortest",
  PollutionFree = "Pollution-free",
  Mountain = "Mountain Bike",
}

export const getRouteColor = (index: number) => {
  switch (index) {
    case 0:
      return "lime";
    case 1:
      return "magenta";
    case 2:
      return "yellow";
    case 3:
      return "orange";
    case 4:
      return "#45A27D";
  }
};
