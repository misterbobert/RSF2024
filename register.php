<?php
// Conectarea la baza de date (înlocuiește detaliile cu cele ale bazei tale de date)
$host = 'sql212.infinityfree.com'; // Adresa serverului MySQL (localhost în majoritatea cazurilor)
$db = 'if0_37393461_crypt'; // Numele bazei de date
$user = 'if0_37393461'; // Utilizatorul MySQL
$pass = '9T0ZkDAXOEslq'; // Parola MySQL

try {
    // Crearea unei conexiuni PDO la baza de date
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    // Setarea modului de raportare a erorilor pentru PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Conexiunea la baza de date a eșuat: " . $e->getMessage());
}

// Procesarea formularului de înregistrare
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $password = $_POST['password'];

    // Validare simplă pentru e-mail și parolă
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Adresa de e-mail nu este validă!";
    } elseif (strlen($password) < 6) {
        echo "Parola trebuie să aibă cel puțin 6 caractere!";
    } else {
        $hashed_password = hash('sha256', $password);  // Criptarea parolei folosind SHA-256

        // Verificăm dacă e-mailul există deja în baza de date
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            echo "Emailul este deja utilizat!";
        } else {
            // Inserăm datele în baza de date
            $stmt = $pdo->prepare("INSERT INTO users (username, email, age, password) VALUES (?, ?, ?, ?)");
            if ($stmt->execute([$username, $email, $age, $hashed_password])) {
                echo "Înregistrare reușită!";
            } else {
                echo "A apărut o eroare la înregistrare!";
            }
        }
    }
}
?>