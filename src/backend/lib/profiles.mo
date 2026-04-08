import Map "mo:core/Map";
import ProfileTypes "../types/profiles";
import Common "../types/common";

module {
  public type ProfileMap = Map.Map<Common.UserId, ProfileTypes.UserProfile>;

  public func getProfile(profiles : ProfileMap, userId : Common.UserId) : ?ProfileTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(profiles : ProfileMap, userId : Common.UserId, profile : ProfileTypes.UserProfile) {
    profiles.add(userId, profile);
  };
};
