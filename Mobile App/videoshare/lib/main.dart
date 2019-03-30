import 'package:flutter/material.dart';
import './Pages/auth.dart';
void main() => runApp(MainPage());

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        '/': (BuildContext context ) => AuthPage(),
      },
    );
  }
}
