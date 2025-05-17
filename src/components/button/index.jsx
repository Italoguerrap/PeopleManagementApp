import { Container } from "./styles";

export function Button( { title, colorButton, icon, loading = false, ...rest} ){

    return(
        <Container type="button" disabled={loading} $colorButton={colorButton} {...rest}>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            {loading ? "Carregando..." : title}
        </Container>
    )

}