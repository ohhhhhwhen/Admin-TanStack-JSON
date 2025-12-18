export async function fetchEmployees() {
  const response = await fetch("http://localhost:3000/employees");
  return response.json();
}

export async function createEmployee(newEmployee) {
  const response = await fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployee),
  });
  return response.json();
}
