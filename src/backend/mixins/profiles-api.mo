import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProfileLib "../lib/profiles";
import ProfileTypes "../types/profiles";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : ProfileLib.ProfileMap,
) {
  public query ({ caller }) func getMyProfile() : async ?ProfileTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func updateProfile(profile : ProfileTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.saveProfile(profiles, caller, profile);
  };

  // Keep these for compatibility with the authorization extension frontend pattern
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : ProfileTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.saveProfile(profiles, caller, profile);
  };
};
