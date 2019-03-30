import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return AuthPageState();
  }
}

class AuthPageState extends State<AuthPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        child: Column(
          children: <Widget>[
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Email',
                fillColor: Colors.blue,
                labelStyle: TextStyle(
                  color: Colors.black,
                ),
                filled: true,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
