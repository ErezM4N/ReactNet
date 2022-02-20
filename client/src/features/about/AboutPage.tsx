import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

const AboutPage=()=> {

    const [validationError, setValidationError] = useState<string[]>([]);
    const getValidationError=()=> {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => {
                setValidationError(error)
            })
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">Error for testing puposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 ERROR</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 ERROR</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 ERROR</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 ERROR</Button>
                <Button variant="contained" onClick={getValidationError}>Test Validation ERROR</Button>
            </ButtonGroup>
            {validationError.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>
                        {validationError.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}

                    </List>
                </Alert>
            }
        </Container>
    )

}

export default AboutPage;