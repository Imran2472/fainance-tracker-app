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
  Toastify({
    text: "You are not logged in",
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      // green
      // background: "#16A34A",
      // red
      background: "#DC2626",
    },
  }).showToast();
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

const sidebar = document.querySelector(".sidebar");
const menubar = document.querySelectorAll(".menubar");
const CloseBtn = document.querySelectorAll(".CloseBtn");

menubar.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.remove("max-[840px]:hidden");
  });
});

CloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    CloseSideBar();
  });
});

const CloseSideBar = () => {
  sidebar.classList.add("max-[840px]:hidden");
};

logout.addEventListener("click", () => {
  Toastify({
    text: "You have logged out successfully",
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      // green
      background: "#16A34A",
      // red
      // background: "#DC2626",
    },
  }).showToast();
  localStorage.removeItem("sb-asmdqoxecgvlyxwstgyk-auth-token");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
});

const dashboard = document.querySelectorAll(".dashboard");
const item = document.querySelectorAll(".dashboard_btn");

item.forEach((btn) => {
  btn.addEventListener("click", () => {
    dashboard.forEach((dash) => {
      item.forEach((btn) => btn.classList.remove("active"));
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

  if (salary_amount > 8000) {
    Toastify({
      text: "You have exceeded the maximum income limit of 8000",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
    return;
  }

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
    FetchTotal();
    if (totalUserFind) {
      const totalIncrease = (total += salary_amount);
      const { data, error } = await supabaseClient
        .from("showtotal")
        .update({ total_amount: totalIncrease })
        .eq("id", total_id)
        .select();
    }

    Toastify({
      text: "transaction inserted successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
    salaryTitleInput.value = "";
    salaryAmountInput.value = "";
    IncomeDateInput.value = "";
    selectOptionParent.value = "";
    userMsgInput.value = "";

    FetchTotal();
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

    FetchTotal();
    const { error } = await supabaseClient
      .from("showtotal")
      .insert({ email, total_amount: salary_amount })
      .select();
    Toastify({
      text: "transaction inserted successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
    salaryTitleInput.value = "";
    salaryAmountInput.value = "";
    IncomeDateInput.value = "";
    selectOptionParent.value = "";
    userMsgInput.value = "";
  }
  FetchData();
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

  if (expense_amount > 8000) {
    Toastify({
      text: "You have exceeded the maximum expense limit of 8000",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        //  background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }

  for (let i = 0; i < TotalArry.length; i++) {
    if (TotalArry[i]?.email === email) {
      ExtotalUserFind = true;
      extotal = TotalArry[i].total_amount;
      extotal_id = TotalArry[i].id;
    } else {
      ExtotalUserFind = false;
    }
  }

  if (extotal < expense_amount) {
    Toastify({
      text: "You don't have enough balance",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
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
    const ExpenseTotal = exTotalMain + expense_amount;
    const { data } = await supabaseClient
      .from("expense")
      .insert({
        expense_title,
        expense_amount,
        email,
        enter_date: expense_date,
        categories: expance_categories,
        reference,
        total_expense: ExpenseTotal ? ExpenseTotal : expense_amount,
      })
      .select();

    const minusTotal = extotal - expense_amount;
    const { error } = await supabaseClient
      .from("showtotal")
      .update({ total_amount: minusTotal })
      .eq("id", extotal_id)
      .select();

    Toastify({
      text: "transaction inserted successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    expenseTitleInput.value = "";
    expenseAmountInput.value = "";
    expenseDateInput.value = "";
    select_option_Ex.value = "";
    userMsgInputEx.value = "";
    FetchExpense();
    FetchTotal();
  }
});

let income_total_dash = document.querySelector("#total_income");

let salary_total_ele = document.querySelector(".income-total");
const finance_body = document.querySelector("#incomeParent");
const expense_body = document.querySelector("#expenseParent");
const IncomeShow = (data) => {
  const div = document.createElement("div");
  salary_total_ele.classList.add("income-total-span");
  data.income_total
    ? (salary_total_ele.innerHTML = `$ ${data?.income_total}`)
    : (salary_total_ele.innerHTML = `$ 0`);
  data.income_total
    ? (income_total_dash.innerHTML = `$ ${data?.income_total}`)
    : (income_total_dash.innerHTML = `$ 0`);

  const content = `
             <div class="income-input-result-div-ele max-[400px]:relative">
                        <div class="income-info-ele">

                           <i class="ri-${
                             data?.categories == "Sallary"
                               ? "cash"
                               : data?.categories == "Freelancer"
                               ? "creative"
                               : data?.categories == "Investiment"
                               ? "verified"
                               : data?.categories == "Stocks"
                               ? "funds"
                               : data?.categories == "Bitcoin"
                               ? "btc"
                               : data?.categories == "Bank Transfer"
                               ? "bank"
                               : data?.categories == "Youtube"
                               ? "youtube"
                               : "lightbulb"
                           }-fill income-icon"></i>

                            <div class="income-info ">
                                <div class="income-info-upper">
                                    <div></div>
                                    <p>${data?.salary_title}</p>
                                </div>

                                <div class="income-info-lower max-[400px]:flex max-[400px]:flex-wrap">

                                    <div class="income-info-lower-amount">
                                        <p>$ ${data.salary_amount}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-calendar-fill"></i>
                                        <p>${data?.enter_date}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-chat-3-fill"></i>
                                        <p>${data?.reference}</p>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <button class="del-income-ele max-[400px]:h-[30px] max-[400px]:w-[30px] max-[400px]:text-[15px]" onclick="DeletIncome(${
                          data?.id
                        })">
                            <i class="ri-delete-bin-7-fill"></i>
                        </button>
                    </div>
    `;
  div.innerHTML = content;
  finance_body.appendChild(div);
};

const DeletIncome = async (id) => {
  const response = await supabaseClient
    .from("finance app")
    .delete()
    .eq("id", id);
  if (response.error) {
    console.error(response.error);
    return;
  } else {
    Toastify({
      text: "Transaction deleted successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
  }
  FetchData();
  FetchTotal();
};

let expense_total_dash = document.querySelector("#total_expense_dash");
let expense_total_ele = document.querySelector(".show_page_total");

const ShowExpense = (data) => {
  const div = document.createElement("div");

  expense_total_ele.classList.add("income-total-span", "text-[#800000]");
  data?.total_expense
    ? (expense_total_ele.innerHTML = "$ " + data?.total_expense)
    : (expense_total_ele.innerHTML = "$ 0");

  data.total_expense
    ? (expense_total_dash.innerHTML = `$ ${data?.total_expense}`)
    : (expense_total_dash.innerHTML = `$ 0`);

  const content = `
             <div class="income-input-result-div-ele">
                        <div class="income-info-ele">

                            <i class="ri-${
                              data?.categories == "Sallary"
                                ? "cash"
                                : data?.categories == "Freelancer"
                                ? "creative"
                                : data?.categories == "Investiment"
                                ? "verified"
                                : data?.categories == "Stocks"
                                ? "funds"
                                : data?.categories == "Bitcoin"
                                ? "btc"
                                : data?.categories == "Bank Transfer"
                                ? "bank"
                                : data?.categories == "Youtube"
                                ? "youtube"
                                : "lightbulb"
                            }-fill income-icon"></i>

                            <div class="income-info">
                                <div class="expense-info-upper">
                                    <div></div>
                                    <p>${data?.expense_title}</p>
                                </div>

                                <div class="income-info-lower max-[400px]:flex max-[400px]:flex-wrap">

                                    <div class="income-info-lower-amount">
                                        <p>$ ${data.expense_amount}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-calendar-fill"></i>
                                        <p>${data?.enter_date}</p>
                                    </div>
                                    <div class="income-info-lower-amount">
                                        <i class="ri-chat-3-fill"></i>
                                        <p>${data?.reference}</p>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <button class="del-income-ele max-[400px]:h-[30px] max-[400px]:w-[30px] max-[400px]:text-[15px]" onclick="DeleExpense(${
                          data?.id
                        })">
                            <i class="ri-delete-bin-7-fill"></i>
                        </button>
                    </div>
    `;
  div.innerHTML = content;
  expense_body.appendChild(div);
};

const DeleExpense = async (id) => {
  const response = await supabaseClient.from("expense").delete().eq("id", id);
  if (response.error) {
    console.error(response.error);
    return;
  } else {
    Toastify({
      text: "Transaction deleted successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
  }
  FetchExpense();
  FetchTotal();
};

// show Recent Transition

const history_outer_div = document.querySelector(".history-outer-div");
const history_outer_div_small = document.querySelector(
  ".history-outer-div-small"
);

const RenderDataFinance = (data) => {
  const div = document.createElement("div");
  div.classList.add("history-ele");
  const content = `
                <p class="text-green-600">${data?.reference}</p>
                <p class="text-green-600">$ ${data?.salary_amount}</p>
      `;
  div.innerHTML = content;
  history_outer_div.appendChild(div);
};
const RenderDataFinanceMobile = (data) => {
  const div = document.createElement("div");
  div.classList.add("history-ele");
  const content = `
                <p class="text-green-600">${data?.reference}</p>
                <p class="text-green-600">$ ${data?.salary_amount}</p>
      `;
  div.innerHTML = content;
  history_outer_div_small.appendChild(div);
};

// fetch data

const FetchData = async () => {
  finance_body.innerHTML = "";
  history_outer_div.innerHTML = "";
  history_outer_div_small.innerHTML = "";
  const { data, error } = await supabaseClient.from("finance app").select();
  data?.filter((item) => {
    if (item?.email === email) {
      finance_data.push(item);
      mixArry.push(item);
      IncomeShow(item);
      RenderDataFinance(item);
      RenderDataFinanceMobile(item);
      ChartGraphs(item);
    }
  });
  FetchTotal();
};

FetchData();

const FetchTotal = async () => {
  const { data, error } = await supabaseClient.from("showtotal").select();
  data?.filter((item) => {
    if (item?.email === email) {
      TotalArry.push(item);
      TotalShow(item);
    }
  });
};

FetchTotal();

const FetchExpense = async () => {
  expense_body.innerHTML = "";
  history_outer_div.innerHTML = "";
  history_outer_div_small.innerHTML = "";
  const { data, error } = await supabaseClient.from("expense").select();
  data?.filter((item) => {
    if (item?.email == email) {
      ExpenseArry.push(item);
      mixArry.push(item);
      ShowExpense(item);
      RenderDataExpenseMobile(item);
      RenderDataExpense(item);
      ChartGraphs(item);
    }
  });
  FetchTotal();
};

FetchExpense();

const RenderDataExpenseMobile = (data) => {
  const div = document.createElement("div");
  div.classList.add("history-ele");
  const content = `
                <p class="text-red-600">${data?.reference}</p>
                <p class="text-red-600">- $ ${data?.expense_amount}</p>
      `;
  div.innerHTML = content;
  history_outer_div_small.appendChild(div);
};
const RenderDataExpense = (data) => {
  const div = document.createElement("div");
  div.classList.add("history-ele");
  const content = `
                <p class="text-red-600">${data?.reference}</p>
                <p class="text-red-600">- $ ${data?.expense_amount}</p>
      `;
  div.innerHTML = content;
  history_outer_div.appendChild(div);
};

const totols = document.querySelector("#totals");
const TotalShow = (data) => {
  data?.total_amount
    ? (totols.innerHTML = `$ ${data?.total_amount}`)
    : (totols.innerHTML = "$ 0");
};

let myChart;
let salary_amount_to_chart = [];
let expense_salary_amount_to_Chart = [];
let income_chart = [];
let expense_chart = [];
const ctx = document.getElementById("chartDiv");
const ChartGraphs = (data) => {
  const charArry = [];
  charArry.push(data);

  charArry.forEach((chartData) => {
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
    ctx.style.width = "100%";
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

console.log(ExpenseArry, finance_data);

if (!ExpenseArry.reference || !finance_data?.reference) {
  ctx.style.width = "100%";
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Red",
        "Blue",
        "Yellow",
        "Green",
        "Purple",
        "Orange",
        "Yellow",
        "income",
        "expense",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3, 10, 40, 5, 33],
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
}
