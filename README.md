# Important notes
This is an app that contains a generic Treatment Plot component.

The only prop that this Treatment Plot component needs is the asset id. Context has been implemented so you can use this value and others across all children and across different charts if needed.

## Constants to consider
Inside the directory of the Treatment component, you can find a constants file in which you will need to defined the following important values:

- DATASET_GRANULARITY: the names of the collections, usually called ``` completion.wits ```. Here you can establish the granularity of your data.
- PROVIDER: the name of your company in Dev Center
- FIELDS: three main attributes needed for a Treatment plot are: Pressure, Rate and Prop Concentration. You should define the key names of these attributes, as well as the units, color and the label that you want to display in the plot axis and the hover component.

Additional to this, remember to define your asset id inside the main App component.


# Getting Started with Create Corva App

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Bundles the app into static files for production.

### `yarn zip`

Bundles the app into ZIP file in app root directory

## Documentation

- [Dev Center documentation](https://app.corva.ai/dev-center/docs/frontend) – information about development process
- [Component Library](https://app.corva.ai/dev-center/docs/frontend/storybook)
- [Datasets documentation](https://app.corva.ai/dev-center/docs/datasets)
