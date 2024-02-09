## Cristiano Ronaldo's All Goals
Welcome to the Cristiano Ronaldo All Goals dataset. 
Here you can explore detailed information about Cristiano Ronaldo's goals, including opponent counts and match details.

## Highest goals against single club
<OpponentCountChart csvUrl="data-cr7.csv" />


## Goals x Years
<YearCountChart csvUrl="data-cr7.csv" />

## Comprehensive Record of Goals Against Clubs and Corresponding Dates
<NewComponent
    content={[
        { component: <FlatUiTable url="data-cr7.csv" />, name: "Flat UI Table" },
        { component: <Table url="data-cr7.csv" />, name: "Table" }
    ]}
/>

<a href="https://www.kaggle.com/datasets/azminetoushikwasi/cr7-cristiano-ronaldo-all-club-goals-stats" target="_blank" rel="noopener noreferrer">Fonte: Kaggle</a>
<br />
<BackButton/>