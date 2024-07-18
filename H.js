ompiled with problems:
×
ERROR in ./src/components/DisplayResume.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/src/components/DisplayResume.js: Unexpected token, expected "," (150:10)

  148 |
  149 |
> 150 |           {error && <div style={{ color: 'red' }}>{error}</div>}
      |           ^
  151 |
  152 |           {resumeData && (
  153 |             <div>
    at constructor (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:351:19)
    at FlowParserMixin.raise (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:3233:19)
    at FlowParserMixin.unexpected (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:3253:16)
    at FlowParserMixin.expect (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:3557:28)
    at FlowParserMixin.parseParenAndDistinguishExpression (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:11163:14)
    at FlowParserMixin.parseParenAndDistinguishExpression (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:5690:18)
    at FlowParserMixin.parseExprAtom (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10835:23)
    at FlowParserMixin.parseExprAtom (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:6781:20)
    at FlowParserMixin.parseExprSubscripts (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10568:23)
    at FlowParserMixin.parseUpdate (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10551:21)
    at FlowParserMixin.parseMaybeUnary (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10529:23)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10383:61)
    at FlowParserMixin.parseExprOps (/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/node_modules/@babel/parser/lib/index.js:10388:23)
