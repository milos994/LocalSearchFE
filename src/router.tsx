import { Route, BrowserRouter as RouterNew, Redirect, Switch } from 'react-router-dom'
import { ROUTES } from './consts/routes'
import { DetailedPage, HomePage } from './pages'

export const Router = () => {
  return (
    <RouterNew> 
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.DETAILED} component={DetailedPage} />
        <Redirect to={ROUTES.HOME} />
      </Switch>
    </RouterNew>
  )
}