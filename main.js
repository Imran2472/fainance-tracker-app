const supabaseUrl = "https://asmdqoxecgvlyxwstgyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbWRxb3hlY2d2bHl4d3N0Z3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODI0MDYsImV4cCI6MjA1MTE1ODQwNn0.m9DZLk8FX4ElPUb6bQZwz3OPmtfUyjUdKlO0I_8Bqwg";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const first_letter = document.querySelector(".first-letter");
const nameShow = document.querySelector(".name-1");
const emailShow = document.querySelector(".email-1");
const logout = document.querySelector(".logout");
const token = JSON.parse(
  localStorage.getItem("sb-asmdqoxecgvlyxwstgyk-auth-token")
);

if (!token) {
  alert("You are not logged in");
  window.location.href = "/";
}
const { email } = token?.user?.user_metadata;
const GetToken = () => {
  const { first_name, email } = token?.user?.user_metadata;
  first_letter.textContent = first_name[0]?.toUpperCase();
  nameShow.textContent = first_name;
  emailShow.textContent = email;
};

GetToken();

logout.addEventListener("click", () => {
  alert("You have logged out successfully");
  localStorage.removeItem("sb-asmdqoxecgvlyxwstgyk-auth-token");
  window.location.href = "/";
});

const dashboard = document.querySelectorAll(".dashboard");
const item = document.querySelectorAll(".dashboard_btn");

item.forEach((btn) => {
  btn.addEventListener("click", () => {
    item.forEach((btn) => btn.classList.remove("active"));
    dashboard.forEach((dash) => {
      if (btn.classList.contains(dash.id)) {
        item.forEach((btn) => btn.classList.remove("hidden"));
        dash.classList.remove("hidden");
        btn.classList.add("active");
      } else {
        dash.classList.add("hidden");
      }
    });
  });
});

// -------start backend functionality -------------

// const incomeParent = document.getElementById("incomeParent");
const salaryTitleInput = document.getElementById("salaryTitle");
const salaryAmountInput = document.getElementById("salaryAmount");
const IncomeDateInput = document.getElementById("IncomeDate");
const userMsgInput = document.getElementById("userMsg");
const totalIncome = document.getElementById("totalIncome");
const selectOptionParent = document.getElementById("select-option");
const expenseUser = false;
let ExtotalUserFind = false;
let extotal;
let extotal_id;
let foundExpense = false;
let exTotalMain;
const finance_data = [];
const TotalArry = [];
const ExpenseArry = [];
let mixArry = [];
let totalUserFind = false;
let Found_income = false;
let SalTotalMain;
let total;
let total_id;

const income_form_ele = document.querySelector("#income_form_ele");

income_form_ele.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email } = token?.user?.user_metadata;
  const salary_title = salaryTitleInput.value;
  const salary = salaryAmountInput.value;
  const salary_amount = parseInt(salary);
  const enter_date = IncomeDateInput.value;
  const categories = selectOptionParent.value;
  const reference = userMsgInput.value;

  for (let i = 0; i < TotalArry.length; i++) {
    if (TotalArry[i]?.email === email) {
      totalUserFind = true;
      total = TotalArry[i].total_amount;
      total_id = TotalArry[i].id;
    } else {
      totalUserFind = false;
    }
  }

  for (let i = 0; i < finance_data.length; i++) {
    if (finance_data[i]?.email === email) {
      Found_income = true;
      SalTotalMain = finance_data[i].income_total;
    } else {
      Found_income = false;
    }
  }

  if (Found_income) {
    const salTotal = (SalTotalMain += salary_amount);
    const { data, error } = await supabaseClient
      .from("finance app")
      .insert({
        email,
        salary_title,
        salary_amount,
        enter_date,
        categories,
        reference,
        income_total: salTotal,
      })
      .select();
    alert("transaction inserted successfully");
    salaryTitleInput.value = "";
    salaryAmountInput.value = "";
    IncomeDateInput.value = "";
    selectOptionParent.value = "";
    userMsgInput.value = "";

    if (totalUserFind) {
      const totalIncrease = (total += salary_amount);
      const { data, error } = await supabaseClient
        .from("showtotal")
        .update({ total_amount: totalIncrease })
        .eq("id", total_id)
        .select();
    }
  } else {
    const { data } = await supabaseClient
      .from("finance app")
      .insert({
        email,
        salary_title,
        salary_amount,
        enter_date,
        categories,
        reference,
        income_total: salary_amount,
      })
      .select();
    console.log(data);
    const { error } = await supabaseClient
      .from("showtotal")
      .insert({ email, total_amount: salary_amount })
      .select();
  }
  FetchData();
  FetchTotal();
});

// expense component get

const expenseTitleInput = document.getElementById("expenseTitle");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseDateInput = document.getElementById("expenseDate");
const userMsgInputEx = document.getElementById("userMsgEx");
const totalexpense = document.getElementById("totalexpense");
const select_option_Ex = document.getElementById("select-option-Ex");
const expenseForm = document.querySelector("#expense_form");
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email } = token?.user?.user_metadata;
  const expense_title = expenseTitleInput.value;
  const expense_amount_int = expenseAmountInput.value;
  const expense_amount = parseInt(expense_amount_int);
  const expense_date = expenseDateInput.value;
  const expance_categories = select_option_Ex.value;
  const reference = userMsgInputEx.value;

  for (let i = 0; i < TotalArry.length; i++) {
    if (TotalArry[i]?.email === email) {
      ExtotalUserFind = true;
      extotal = TotalArry[i].total_amount;
      extotal_id = TotalArry[i].id;
    } else {
      ExtotalUserFind = false;
    }
  }

  for (let i = 0; i < ExpenseArry.length; i++) {
    if (ExpenseArry[i]?.email === email) {
      foundExpense = true;
      exTotalMain = ExpenseArry[i].total_expense;
    } else {
      foundExpense = false;
    }
  }

  if (ExtotalUserFind) {
    const ExpenseTotal = (exTotalMain += expense_amount);
    const { data } = await supabaseClient
      .from("expense")
      .insert({
        expense_title,
        expense_amount,
        email,
        enter_date: expense_date,
        categories: expance_categories,
        reference,
        total_expense: ExpenseTotal,
      })
      .select();
    const minusTotal = extotal - expense_amount;
    const { error } = await supabaseClient
      .from("showtotal")
      .update({ total_amount: minusTotal })
      .eq("id", extotal_id)
      .select();
    if (data) {
      alert("transaction inserted successfully");
      expenseTitleInput.value = "";
      expenseAmountInput.value = "";
      expenseDateInput.value = "";
      select_option_Ex.value = "";
      userMsgInputEx.value = "";
    }
  }
  FetchExpense();
  FetchTotal();
});

let expense_total_ele = document.querySelector("#totalexpense_page");
let income_total_dash = document.querySelector("#total_income");
let expense_total_dash = document.querySelector("#total_expense_dash");
let salary_total_ele = document.querySelector(".income-total");
const finance_body = document.querySelector("#incomeParent");
const expense_body = document.querySelector("#expenseParent");
const IncomeShow = (data) => {
  finance_body.innerHTML = "";
  data?.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("income-input-result-div-ele");
    salary_total_ele.classList.add("income-total-span");
    item.income_total
      ? (salary_total_ele.innerHTML = `$ ${item?.income_total}`)
      : (salary_total_ele.innerHTML = `$ 0`);
    item.income_total
      ? (income_total_dash.innerHTML = `$ ${item?.income_total}`)
      : (income_total_dash.innerHTML = `$ 0`);

    div.innerHTML = `
             <div class="income-input-result-div-ele">
                        <div class="income-info-ele">

                           <i class="ri-${
                             item?.categories == "Sallary"
                               ? "cash"
                               : item?.categories == "Freelancer"
                               ? "creative"
                               : item?.categories == "Investiment"
                               ? "verified"
                               : item?.categories == "Stocks"
                               ? "funds"
                               : item?.categories == "Bitcoin"
                               ? "btc"
                               : item?.categories == "Bank Transfer"
                               ? "bank"
                               : item?.categories == "Youtube"
                               ? "youtube"
                               : "lightbulb"
                           }-fill income-icon"></i>

                            <div class="income-info">
                                <div class="income-info-upper">
                                    <div></div>
                                    <p>${item?.salary_title}</p>
                                </div>

                                <div class="income-info-lower">

                                    <div class="income-info-lower-amount">
                                        <p>$ ${item.salary_amount}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-calendar-fill"></i>
                                        <p>${item?.enter_date}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-chat-3-fill"></i>
                                        <p>${item?.reference}</p>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <button class="del-income-ele">
                            <i class="ri-delete-bin-7-fill"></i>
                        </button>
                    </div>
    `;

    finance_body.appendChild(div);
  });
};

const ShowExpense = (data) => {
  expense_body.innerHTML = "";
  data?.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("income-input-result-div-ele");
    expense_total_ele.classList.add("income-total-span", "text-[#800000]");
    item.total_expense
      ? (expense_total_ele.innerHTML = `$ ${item?.total_expense}`)
      : (expense_total_ele.innerHTML = `$ 0`);
    item.total_expense
      ? (expense_total_dash.innerHTML = `$ ${item?.total_expense}`)
      : (expense_total_dash.innerHTML = `$ 0`);

    div.innerHTML = `
             <div class="income-input-result-div-ele">
                        <div class="income-info-ele">

                            <i class="ri-${
                              item?.categories == "Sallary"
                                ? "cash"
                                : item?.categories == "Freelancer"
                                ? "creative"
                                : item?.categories == "Investiment"
                                ? "verified"
                                : item?.categories == "Stocks"
                                ? "funds"
                                : item?.categories == "Bitcoin"
                                ? "btc"
                                : item?.categories == "Bank Transfer"
                                ? "bank"
                                : item?.categories == "Youtube"
                                ? "youtube"
                                : "lightbulb"
                            }-fill income-icon"></i>

                            <div class="income-info">
                                <div class="expense-info-upper">
                                    <div></div>
                                    <p>${item?.expense_title}</p>
                                </div>

                                <div class="income-info-lower">

                                    <div class="income-info-lower-amount">
                                        <p>$ ${item.expense_amount}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-calendar-fill"></i>
                                        <p>${item?.enter_date}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-chat-3-fill"></i>
                                        <p>${item?.reference}</p>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <button class="del-income-ele">
                            <i class="ri-delete-bin-7-fill"></i>
                        </button>
                    </div>
    `;

    expense_body.appendChild(div);
  });
};

// fetch data

const FetchData = async () => {
  const { data, error } = await supabaseClient.from("finance app").select();
  data?.forEach((item) => {
    if (item?.email === email) {
      finance_data.push(item);
      mixArry.push(item);
      IncomeShow(ExpenseArry);
      ChartGraphs(ExpenseArry);
      FetchTotal();
    }
  });
};

FetchData();

const FetchTotal = async () => {
  const { data, error } = await supabaseClient.from("showtotal").select();
  data?.forEach((item) => {
    if (item?.email === email) {
      TotalArry.push(item);
      TotalShow([item]);
    }
  });
};

FetchTotal();

const FetchExpense = async () => {
  const { data, error } = await supabaseClient.from("expense").select();
  data?.forEach((item) => {
    if (item?.email == email) {
      // console.log(item);
      ExpenseArry.push(item);
      mixArry.push(item);
      ShowExpense(ExpenseArry);
      ChartGraphs(ExpenseArry);
    }
  });
};

FetchExpense();

const totols = document.querySelector("#totals");
const TotalShow = (data) => {
  data[0]?.total_amount
    ? (totols.innerHTML = `$ ${data[0]?.total_amount}`)
    : (totols.innerHTML = "$ 0");
};
let myChart;
let salary_amount_to_chart = [];
let expense_salary_amount_to_Chart = [];
let income_chart = [];
let expense_chart = [];
const ctx = document.getElementById("chartDiv");
const ChartGraphs = (data) => {
  // if (!data) {
  //   myChart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //       datasets: [
  //         {
  //           label: "# of Votes",
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
  data.forEach((chartData) => {
    console.log(chartData);
    if (myChart) {
      myChart.destroy(); // Destroy the existing chart
    }
    if (chartData?.salary_amount) {
      salary_amount_to_chart.push(chartData.salary_amount);
      income_chart.push("income");
    } else {
      expense_salary_amount_to_Chart.push(chartData.expense_amount);
      expense_chart.push("expense");
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...income_chart, ...expense_chart],
        datasets: [
          {
            label: "income and expenses",
            data: [
              ...salary_amount_to_chart,
              ...expense_salary_amount_to_Chart,
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
};
