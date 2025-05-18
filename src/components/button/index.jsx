import { Container } from "./styles";

export function Button({
  title,
  colorButton,
  icon,
  loading = false,
  primary = false,
  ...rest
}) {
  return (
    <Container
      type="button"
      disabled={loading}
      $colorButton={colorButton}
      $primary={primary}
      {...rest}
    >
      {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
      {loading ? "Carregando..." : title}
    </Container>
  );
}
