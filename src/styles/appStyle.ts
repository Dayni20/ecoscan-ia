import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e1ffe9",
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "800", color: "#1A202C" },
  subtitle: { fontSize: 16, color: "#718096", marginTop: 4 },
  form: {
    backgroundColor: "#edf3f4",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 15, color: "#718096" },
  link: { fontSize: 15, color: "#4F46E5", fontWeight: "700" },
});

export const registerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#76c8eb",
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  emoji: { fontSize: 56, marginBottom: 12},
  title: { fontSize: 28, fontWeight: "800", color: "#1A202C" },
  subtitle: { fontSize: 16, color: "#718096", marginTop: 4 },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 15, color: "#718096" },
  link: { fontSize: 15, color: "#4F46E5", fontWeight: "700" },
});

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a463e" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop:73,
    backgroundColor: "#0a463e",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  greeting: { fontSize: 20, fontWeight: "800", color: "#1A202C" },
  email: { fontSize: 13, color: "#718096", maxWidth: 220 },
  logoutBtn: {
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  logoutText: { color: "#E53E3E", fontWeight: "700", fontSize: 14 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: "#718096", textAlign: "center" },
});

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a463e" },
  content: { padding: 24 },
  flag: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  flagFallback: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },
  userId: { fontSize: 13, color: "#718096" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A202C",
    lineHeight: 30,
    textTransform: "capitalize",
  },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 20 },
  bodyLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A0AEC0",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  body: { fontSize: 16, color: "#4A5568", lineHeight: 26 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: "#718096", textAlign: "center" },
});

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a463e",
  },
  text: { marginTop: 12, fontSize: 16, color: "#718096" },
});

export const buttonStyles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  flagFallback: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: "#4F46E5" },
  userId: { fontSize: 12, color: "#718096" },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  body: { fontSize: 13, color: "#718096", lineHeight: 20 },
});

export const inputStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#2D3748", marginBottom: 6 },
  inputWrapper: { position: "relative" },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#2D3748",
    backgroundColor: "#F7FAFC",
  },
  inputError: { borderColor: "#E53E3E" },
  eyeIcon: { position: "absolute", right: 14, top: 12 },
  eyeText: { fontSize: 20 },
  errorText: { fontSize: 12, color: "#E53E3E", marginTop: 4 },
});
