import login from "./login";
import * as members from "./member";
import tools from "./tools";
import style from "./style";
import platform from "./platform";
import otp from "./otp";
import { checkHash, recover, updatePasswordByHash } from "./recover";

export const apiLogin = login;
export const apiRecover = recover;
export const apiCheckRecoverHash = checkHash;
export const apiUpdatePasswordByHash = updatePasswordByHash;
export const apiMembers = members;
export const apiTools = tools;
export const apiStyle = style;
export const apiOtp = otp;
export const apiPlatform = platform;
