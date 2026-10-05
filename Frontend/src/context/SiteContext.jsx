import { createContext, useContext } from "react";

export const SiteContext = createContext({ profile: {}, settings: {}, data: {} });

export const useSite = () => useContext(SiteContext);