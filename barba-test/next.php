<!DOCTYPE html>
<html lang="en">
<?php include_once('./inc/components/head.php'); ?>

<body data-barba="wrapper">
    <?php include_once('./inc/components/header.php'); ?>
    <!-- put here content that will not change
    between your pages, like <header> or <nav> -->

    <main data-barba="container" data-barba-namespace="home">
        <h1>I am <?php echo "next";?></h1>
        <!-- put here the content you wish to change
      between your pages, like your main content <h1> or <p> -->
    </main>
    <?php include_once('./inc/components/footer.php'); ?>
    <!-- put here content that will not change
    between your pages, like <footer> -->
</body>

</html>