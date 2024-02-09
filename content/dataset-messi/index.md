## Lionel Messi's All Goals
Welcome to the Cristiano Ronaldo All Goals dataset. 
Here you can explore detailed information about Cristiano Ronaldo's goals, including opponent counts and match details.

## Highest goals against single club
<OpponentCountChart csvUrl="data-messi.csv" />

## Goals x Years
<YearCountChart csvUrl="data-messi.csv" />

## Comprehensive Record of Goals Against Clubs and Corresponding Dates

<NewComponent
    content={[
        { component: <FlatUiTable url="data-messi.csv" />, name: "Flat UI Table" },
        { component: <Table url="data-messi.csv" />, name: "Table" }
    ]}
/>

<BackButton/>